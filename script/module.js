modules = [];

function Card(json) {
	var json = json || {};
	this.label = json.label || null;
	this.joined = json.joined || "none";
	this.color = json.color || "white";
	this.children = json.children || [];
	if (!(this.children instanceof Array)) {
		this.children = [this.children];
	}
	this.elementObj = null;
	this.element = function() {
		if (this.elementObj == null) {
			var elem = document.createElement("div");
			elem.addClass("card");
			this.elementObj = elem;

			// Add classes relevant to vars
			elem.addClass(this.color);
			if (/(both|top)/.test(this.joined)) {
				elem.addClass("joined-top");
			}
			if (/(both|bottom)/.test(this.joined)) {
				elem.addClass("joined-bottom");
			}

			// Add label
			if (this.label != null) {
				elem.setAttribute("data-label",
					this.label);
			}

			// Loop through children
			for (var x = 0, y = this.children.length;
				x < y; ++ x) {
				var child = this.children[x];
				elem.appendChild(child);
			}
		}
		return this.elementObj;
	}
}

Module.prototype = new Card();
function Module(json) {
	var json = json || {};
	var _element = this.element;
	this.title = json.title || null;
	this.joined = json.joined || "none";
	this.color = json.color || "white";
	this.steps = json.steps || [];
	this.element = function() {
		if (this.elementObj == null) {
			var elem = document.createElement("div");
			elem.addClass("card");
			elem.addClass("no-padding");
			elem.addClass("module");
			elem.addEventListener("click",
				function(event) {
				if (!event.target.hasClass(
					"title")) {
					return;
				}
				if (!event.target.parentElement.hasClass(
					"module")) {
					return;
				}

				elem.toggleClass("expanded");
			});
			this.elementObj = elem;

			// Add classes relevant to vars
			elem.addClass(this.color);
			if (/(both|top)/.test(this.joined)) {
				elem.addClass("joined-top");
			}
			if (/(both|bottom)/.test(this.joined)) {
				elem.addClass("joined-bottom");
			}

			// Add title
			if (this.title != null) {
				var title =
					document.createElement("div");
				title.addClass("title");
				title.innerHTML = this.title;
				elem.appendChild(title);
			}

			for (var x = 0, y = this.steps.length;
				x < y; ++ x) {
				var step = this.steps[x];
				if (!(step instanceof ModuleStep)) {
					step = new ModuleStep(step);
				}
				step.order = (x + 1);
				elem.appendChild(step.element());
			}
		}
		return this.elementObj;
	}
}

function ModuleStep(json) {
	this.order = json.order || 0;
	this.title = json.title || "Title";
	this.visual = json.visual || null;
	this.elementObj = null;
	this.element = function() {
		if (this.elementObj == null) {
			var elem = document.createElement("div");
			elem.addClass("module-step");
			elem.setAttribute("data-order",
				this.order);
			this.elementObj = elem;

			var content = document.createElement("div");
			content.addClass("content");
			elem.appendChild(content);

			var title = document.createElement("div");
			title.addClass("title");
			title.innerHTML = this.title;
			content.appendChild(title);

			var render = document.createElement("div");
			render.addClass("render");
			// console.log(this.visual.highlight);
			render.appendChild(this.visual.element());
			content.appendChild(render);
		}
		return this.elementObj;
	}
}

function separate_cards(card1, card2) {
	// card1 is the top card
	// card2 is the bottom card
}