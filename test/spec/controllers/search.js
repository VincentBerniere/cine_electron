'use strict';

describe('Controller: SearchCtrl', function () {

    // load the controller's module
    beforeEach(module('coursExoApp'));

    var SearchCtrl,
        scope, serviceAjax;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _serviceAjax_) {
        scope = $rootScope.$new();
        serviceAjax = _serviceAjax_;
        SearchCtrl = $controller('SearchCtrl', {
            $scope: scope,
            serviceAjax: serviceAjax
        });
    }));

    it('should set $scope.movies and $scope.total_pages when calling $scope.loadMovies', function () {
        spyOn(serviceAjax, 'search').and.callFake(function () {
            return{
                success: function (callback) {
                    callback({"results": [{}], "total_pages": 10})
                }
            }
        });

        scope.loadMovies();

        expect(scope.totalPages).toEqual(10);
        expect(scope.movies).toEqual([{}]);
    });
    it('should call loadMovies function when calling pageChanged function', function () {
        spyOn(scope, 'loadMovies');

        scope.pageChanged();

        expect(scope.loadMovies).toHaveBeenCalled();
    });

    it('should set $scope.orderByReverse and $scope.orderByPredicate when calling $scope.clickPredicateName function', function () {
        scope.orderByReverse = true;

        scope.clickPredicateName();

        expect(scope.orderByPredicate).toBe('title');
        expect(scope.orderByReverse).toBe(false);
    });

    it('should set $scope.orderByReverse and $scope.orderByPredicate when calling $scope.clickPredicateRate function', function () {
        scope.orderByReverse = true;

        scope.clickPredicateRate();

        expect(scope.orderByPredicate).toBe('vote_average');
        expect(scope.orderByReverse).toBe(false);
    });
});
