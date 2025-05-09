function tsp_ls(dm) {
  // https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
  var path = Array.from({ length: dm.length} , (value,index) => index); 
  shuffle(path);
  const RepeatAmount = 5;
  
  var k;
  const n = path.length;
  var PathCost = cost(path, dm);

  for (var t = RepeatAmount; t > 0; t--) {
    for (var i = 0; i < n; i++) {
      k = i + randInt(n - i);

      var p = path.slice(0, i)
          .concat(path.slice(i, k + 1).reverse())
          .concat(path.slice(k + 1));

      var pc = cost(p, dm);

      if (pc < PathCost) {
        path = p;
        PathCost = pc;
        t = RepeatAmount;
      }
    }
  }
  return PathCost;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
function randInt(max) {
  return Math.floor(Math.random() * max);
}


function cost(path, dm) {
  var c = 0;
  for (var i = 0; i < path.length - 1; i++) {
    c += dm[path[i]][path[i + 1]];
  }
  return c;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
// shuffle path
// for i in range of cities
// pick random number k, less than len - i but greater than i and not equal to last k
// if improved, new use path, else discard
// if RepeatAmount loops without improvment, stop return path
