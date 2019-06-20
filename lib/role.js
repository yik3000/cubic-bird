module.exports = {
	list:{
		admin: {id:1, name: '管理员'},
		coach:{id:2, name: '教練'},
		assisstant:{id:3, name: '輔導員'},
	},
	isAdmin: function(user){
		return user.roles.indexOf(this.list.admin.id) > -1;
	},
	onlyContainsRoles:function(user,roles){
	    var pass = false;
	    roles.forEach(function(role){
	      if(user.roles.indexOf(role) > -1){
	        pass = true;
	      } 
	    })
	    return pass;		
	},
	containsRole:function(user, roles){
		if(this.isAdmin(user) == true) return true;
	    var pass = false;
	    roles.forEach(function(role){
	      if(user.roles.indexOf(role) > -1){
	        pass = true;
	      } 
	    })
	    return pass;
  	}
}