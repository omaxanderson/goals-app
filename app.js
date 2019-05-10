import createError from 'http-errors';
import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Routers
import indexRouter from './routes/index';
import goalsRouter from './routes/goals';
import reviewRouter from './routes/review';
import listRouter from './routes/list';

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api', indexRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/review', reviewRouter);
app.use('/api/list', listRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   console.log(err);
   // render the error page
   res.status(err.status || 500);
   res.send(JSON.stringify(err));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8081';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

function onError(error) {
   if (error.syscall !== 'listen') {
      throw error;
   }

   const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(`${bind} requires elevated privileges`);
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(`${bind} is already in use`);
         process.exit(1);
         break;
      default:
         throw error;
   }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
   const addr = server.address();
   const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
   console.log(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

export default app;
