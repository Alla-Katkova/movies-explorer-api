const router = require('express').Router();
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
const auth = require('../middlewares/auth');
const { logout } = require('../controllers/users');

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
// роут на выход
router.post('/signout', logout);

// если запрос идет на неизвестный роут
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
