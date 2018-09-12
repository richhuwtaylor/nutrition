const express = require('express');

const foodsRouter = require('./routes/foods');
const infoRouter = require('./routes/info');

const app = express();

app.use(express.static('public'));


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

app.listen(8080, () => console.log("Listening on port 8080!"));

module.exports = app;
