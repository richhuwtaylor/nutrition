const express = require('express');

const foodsRouter = require('./routes/foods');
const infoRouter = require('./routes/info');

const app = express();

const dirname = app.get('env') === 'development' ? 'public' : 'dist';
app.use(express.static(dirname));


app.use('/foods', foodsRouter);
app.use('/info', infoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send an error response
    res.status(err.status || 500);
    res.send();
});

const portNumber = process.env.PORT || 8080;
app.listen(portNumber, () => console.log("Listening on port "+portNumber));

module.exports = app;
