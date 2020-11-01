import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { users: userController },
    router,
  } = app;

  router.get('/list', userController.getUserList);
  router.get('/user', userController.getUser);

  router.post('/user', userController.createUser);

  router.put('/user', userController.editUser);
};
