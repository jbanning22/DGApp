import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { AppModule } from './../src/app.module';
import { MeasuredThrowsDto } from '../src/measure-throws/dto/measureThrow.dto';
import { EditUserDto } from '../src/user/dto/edit-user-dto';
import { EditThrowDto } from '../src/measure-throws/dto/edit-measured-throw.dto';
import { ScorecardDto } from '../src/scorecard/dto/scorecard.dto';
import { HoleDto } from '../src/hole/dto/hole.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3001);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3001');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'jack2@gmail.com',
      password: 'password',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get Me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit User', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Jake',
          email: 'jake@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });
  describe('Measured Throws', () => {
    describe('Get empty throws', () => {
      it('should get throws', () => {
        return pactum
          .spec()
          .get('/measure-throws')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create throw', () => {
      const dto: MeasuredThrowsDto = {
        disc: 'Boss',
        distance: '350',
      };
      it('should create throw', () => {
        return pactum
          .spec()
          .post('/measure-throws')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('throwId', 'id');
      });
    });

    describe('Get throw by id', () => {
      it('should get throw by id', () => {
        return pactum
          .spec()
          .get('/measure-throws/{id}')
          .withPathParams('id', '$S{throwId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{throwId}');
      });
    });

    describe('Edit throw by id', () => {
      const dto: EditThrowDto = {
        throwtype: 'roller',
        distance: '500',
      };
      it('should edit throw', () => {
        return pactum
          .spec()
          .patch('/measure-throws/{id}')
          .withPathParams('id', '$S{throwId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.distance)
          .expectBodyContains(dto.throwtype);
      });
    });
    describe('Delete throws by id', () => {
      it('should delete throws', () => {
        return pactum
          .spec()
          .delete('/measure-throws/{id}')
          .withPathParams('id', '$S{throwId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });

      it('should get empty throw', () => {
        return pactum
          .spec()
          .get('/measure-throws')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
  describe('Scorecard', () => {
    describe('Get empty scorecards', () => {
      it('should get scorecards', () => {
        return pactum
          .spec()
          .get('/scorecard')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create scorecard', () => {
      const dto: ScorecardDto = {
        courseName: 'White Clay',
        courseLength: 18,
        isCompleted: false,
      };
      it('should create scorecard', () => {
        return pactum
          .spec()
          .post('/scorecard')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('id', 'playerId');
      });
    });

    describe('Get scorecard by id', () => {
      it('should get scorecard by id', () => {
        return pactum
          .spec()
          .get('/scorecard/{id}')
          .withPathParams('id', '$S{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{id}');
      });
    });

    describe('Edit scorecard by id', () => {
      const dto: ScorecardDto = {
        courseName: 'broken chains',
        courseLength: 18,
      };
      it('should edit scorecard', () => {
        return pactum
          .spec()
          .patch('/scorecard/{id}')
          .withPathParams('id', '$S{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.courseName);
      });
    });
    describe('Delete scorecard by id', () => {
      it('should delete scorecard', () => {
        return pactum
          .spec()
          .delete('/scorecard/{id}')
          .withPathParams('id', '$S{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });

  describe('Holes', () => {
    // describe('Get empty holes', () => {
    //   it('should get holes', () => {
    //     return pactum
    //       .spec()
    //       .get('/hole')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAt}',
    //       })
    //       .expectStatus(200)
    //       .expectBody([]);
    //   });
    // });

    describe('Create hole', () => {
      const dto: HoleDto = {
        holeNumber: 1,
        strokes: 3,
        par: 3,
      };
      it('should create hole', () => {
        return pactum
          .spec()
          .post('/hole')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('id', 'playerId');
      });
    });

    describe('Get hole by id', () => {
      it('should get hole by id', () => {
        return pactum
          .spec()
          .get('/hole/{id}')
          .withPathParams('id', '$S{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{id}');
      });
    });

    describe('Edit hole by id', () => {
      const dto: HoleDto = {
        holeNumber: 4,
        strokes: 3,
        par: 4,
      };
      it('should edit hole', () => {
        return pactum
          .spec()
          .patch('/hole/{id}')
          .withPathParams('id', '$S{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.strokes);
      });
    });

    describe('Delete hole by id', () => {
      it('should delete hole', () => {
        return pactum
          .spec()
          .delete('/hole/{id}')
          .withPathParams('id', '$S{id}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });
});
