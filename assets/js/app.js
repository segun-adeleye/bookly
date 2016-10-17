(function() {
  var app = angular.module('bookly', []);

  app.controller('BookController', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log){
    $scope.baseUrl = 'http://' + $location.host() + ':' + $location.port();
    $scope.bookList = [];
    $scope.userList;

    $scope.getBooks = function() {
      $http.get('/book/getAllBooks')
        .then(function(response) {
          var data = response.data;
          $scope.bookList = data.books;
          $scope.userList = data.users;
        }, function(response) {
             $log.info(response);
        });
    };

    $scope.getBooks();

    $scope.addBook = function() {
      $http.post('/addBook', {
        title: $scope.title,
        author: $scope.author,
        rating: $scope.rating,
        comment: $scope.comment
      }).then(function(response) {
          var data = response.data;
          $scope.bookList.push(data.book);
        }, function(response) {
             $log.info(response);
        });
    };

    $scope.getAverageRating = function(book) {
      var ratingsArray = book.ratings.map(function(rate) { return rate.rating });
      var totalRating = ratingsArray.reduce(function(prev, curr) { return prev + curr });
      return totalRating / ratingsArray.length;
    };

    $scope.getTotalRatingMessage = function(ratingsCount) {
      return ratingsCount + ' ' + (ratingsCount > 1 ? 'people' : 'person');
    };

  }]);

  app.controller('AuthController', ['$scope', '$log', '$http', '$window', function($scope, $log, $http, $window) {
    $scope.login = function() {
      $http.post('/login', {
        email: $scope.email,
        password: $scope.password
      }).then(function(response) {
          var data = response.data;
          if (data.user) {
            if (data.loggedIn) alert('An account is already active');
            $window.location.href = '/';
          } else {
            alert(data.message)
          }
        }, function(response) {
             $log.info(response);
        });
    };

    $scope.register = function() {
      $http.post('/register', {
        email: $scope.email,
        password: $scope.password
      }).then(function(response) {
          var user = response.data;
          if (user) {
            $window.location.href = '/login';
          } else {
            $log.info(response);
          }
        }, function(response) {
             alert('error');
             $log.info(response);
        });
    };
  }]);

  app.controller('RatingController', ['$scope', '$log', '$http', function($scope, $log, $http) {
    $scope.rate = function() {
      $http.post('/rate', {
        rating: $scope.addRating,
        comment: $scope.addComment,
        book: $scope.book.id
      }).then(function(response) {
        var rating = response.data;
        console.log(rating)
        var bookIndex = $scope.bookList.findIndex(function(book) {
          console.log(book.id);
          console.log(rating.book);
          return book.id === rating.book;
        });
        console.log(bookIndex);
        $scope.bookList[bookIndex].ratings.push(rating);
      }, function(response) {
           $log.info(response);
      });
    }
  }]);

})();
