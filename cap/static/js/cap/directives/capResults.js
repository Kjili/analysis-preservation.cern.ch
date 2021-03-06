/* -*- coding: utf-8 -*-
 *
 * This file is part of CERN Analysis Preservation Framework.
 * Copyright (C) 2016 CERN.
 *
 * CERN Analysis Preservation Framework is free software; you can redistribute
 * it and/or modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * CERN Analysis Preservation Framework is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CERN Analysis Preservation Framework; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
 * MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

/**
 * @ngdoc directive
 * @name capResults
 * @description
 *    Returns deposits and records 
 *    depending on status and limit
 * @namespace capResults
 * @example
 *    Usage:
 *     <cap-results limit='10' type='records'>
 *     <cap-results limit='10' status='draft' type='deposits'>
 */
angular.module('cap.directives')
  .directive('capResults', ['capRecordsClient', function(capRecordsClient) {
    return {
      restrict: 'E',
      templateUrl: '/static/templates/cap/recent_results.html',
      scope: {
        limit: '@',
        status: '@',
        type: '@',
        paginate: '=paginate'
      },
      link: function(scope, element, attrs) {
        if(attrs.type == 'records') {
          capRecordsClient.get_experiment_records(limit=attrs.limit)
          .then(function(response) {
            scope.results = response;
            get_paginated_results(attrs.type);
          }, function(error) {
            scope.error = error;
          });  
        } else {
          capRecordsClient.get_deposits(limit=attrs.limit, status=attrs.status)
          .then(function(response) {
            scope.results = response;
            get_paginated_results(attrs.type);
          }, function(error) {
            scope.error = error;
          });  
        }

        function get_paginated_results(type) {
          scope.totalItems = scope.results.data.hits.total;
          scope.currentPage = 1;
          scope.maxSize = 5;
          scope.setPage = function (pageNo) {
            scope.currentPage = pageNo;
          };

          scope.pageChanged = function(currentPage) {
            
            if (type == 'records') {
              capRecordsClient.get_experiment_records(limit=attrs.limit, page=currentPage)
              .then(function(response){
                scope.results = response;
              }, function(error) {
                scope.error = error;
              })
            } else {
              capRecordsClient.get_deposits(limit=attrs.limit, status=attrs.status, page=currentPage)
              .then(function(response){
                scope.results = response;
              }, function(error) {
                scope.error = error;
              })
            }
          };
        };
      }
    }
  }])