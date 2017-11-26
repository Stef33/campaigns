var app = angular.module('campaigns', []);

app.controller('campaignController', function($scope, $http) {
    //Create two empty arrays to import datas
    $scope.campaigns = [];
    $scope.brands = [];

    //Import datas from JSON
    $http({
            method : "GET",
            url : "https://historic-crater-lake-59853.herokuapp.com/"
    }).then(function(res) {
        $scope.campaigns = res.data.campaigns;
        $scope.brands = res.data.brands;

        //Create function to replace campaigns brand_id by the brand name in campaigns array
        function fillCampaignsWithBrands(campaigns, brand) {
            for(let i=0; i<campaigns.length; i++){
                if(campaigns[i].brand_id == brand.id){
                    campaigns[i].brand = brand.name;
                    delete campaigns[i].brand_id;
                }
            }
        }

        //Replace campaigns brand_id by the brand name in campaigns array
        $scope.brands.forEach(function(brand){
            fillCampaignsWithBrands($scope.campaigns, brand);
        })

    });

    //Function to add new campaigns in the view.
    $scope.addCampaign = function() {

        $scope.newCampaign.start_date = Date.now();
        $scope.id = $scope.campaigns[$scope.campaigns.length - 1].id + 1;
        console.log($scope.id);

        $scope.campaigns.push({
            id: $scope.id,
            brand: $scope.newCampaign,
            added: false
        });
        $scope.newCampaign = "";


    };

    //Function to delete campaigns from the view.
    //Allows to delete one by one
    $scope.remove = function() {
        var oldList = $scope.campaigns;
        $scope.campaigns = [];
        angular.forEach(oldList, function(campaign) {
            if(!campaign.added) $scope.campaigns.push(campaign);
        });
    };

});
