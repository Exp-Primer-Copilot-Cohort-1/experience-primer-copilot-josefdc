function skillsMember(){
    return{
        restrict: 'E',
        templeateUrl: 'templates/member.html',
        controller: function(){
            this.member = {};
            this.addMember = function(){
                members.push(this.member);
                this.member = {};
            };
        },
        controllerAs: 'memberCtrl'
    }
}