const express = require('express');
const app = express();
const expresserror = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

function handleCalculation(req, res, next, operation, calculateFn) {
  if (!req.query.nums) {
    return next(new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400));
  }
  let numsAsStrings = req.query.nums.split(',');
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    return next(new ExpressError(nums.message));
  }

  let result = {
    operation,
    result: calculateFn(nums)
  };

  return res.json(result);
}

app.get('/mean', (req, res, next) => {
  handleCalculation(req, res, next, 'mean', findMean);
});

app.get('/median', (req, res, next) => {
  handleCalculation(req, res, next, 'median', findMedian);
});

app.get('/mode', (req, res, next) => {
  handleCalculation(req, res, next, 'mode', findMode);
});

app.use((req, res, next) => {
  return next(new ExpressError('Not Found', 404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('Server starting on port 3000');
});
