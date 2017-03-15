function Controller(req,res) {
	this.req = req;
	this.res = res;
};

Controller.prototype.redirectBack = function() {
	this.res.redirect(this.req.originalUrl);
}

module.exports = Controller;