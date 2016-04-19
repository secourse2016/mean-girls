
function makeSnow() {
	var el = document.getElementById('snow');
	var width = 1000;
	var height = 1000;
	var particles = [];

	var Particle = function() {
		this.x = this.y = this.dx = this.dy = 0;
		this.reset();
	}

	Particle.prototype.reset = function() {
		this.y = Math.random() * height;
		this.x = Math.random() * width;
		this.dx = (Math.random() * 1) - 0.5;
		this.dy = (Math.random() * 0.5) + 0.5;
	}

	function createParticles(count) {
		if (count != particles.length) {
			particles = [];
			for (var i = 0; i < count; i++) {
				particles.push(new Particle());
			}
		}
	}

	function onResize() {
		width = window.innerWidth;
		height = window.innerHeight;
		el.width = width;
		el.height = height;

		createParticles((width * height) / 10000);
	}

	function updateParticles() {

		particles.forEach(function(particle) {
			particle.y += particle.dy;
			particle.x += particle.dx;

			if (particle.y > height) {
				particle.y = 0;
			}

			if (particle.x > width) {
				particle.reset();
				particle.y = 0;
			}

		});
		window.requestAnimationFrame(updateParticles);
	}

	onResize();
	updateParticles();
}

makeSnow();
