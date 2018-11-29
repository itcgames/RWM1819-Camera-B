class Game
{
  /**
   * constructor of the Game object.
   */
  constructor()
  {
    this.img = new Image();
    this.img.src = "resources/debugmap.png";

    this.bounds = {
      width: 2560,
      height: 2048,
    };

    gameNs.player = new Player(0, 0, 50);
    gameNs.camera = new Camera(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      //this.bounds.width,
      //this.bounds.height,
    );
    gameNs.camera.setBounds(0,0,this.bounds.width,this.bounds.height);
  }

  /**
   *  Initialises the game world
   */
  initWorld()
  {
    console.log("Initialising the game world");
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("click", this.clickHandler);
  }

  /**
  * Updates the game object
  */
  update() {
    const now = Date.now();
    
    var deltaTime = (now - gameNs.game.previousTime);
    gameNs.game.previousTime = now;

    gameNs.player.update();
    gameNs.camera.update(gameNs.player.pos);

    gameNs.game.draw(deltaTime)
    window.requestAnimationFrame(gameNs.game.update);
  }

  draw(deltaTime)
  {
    var canvas = document.getElementById('mycanvas');
	  var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.img, 0,0);

    gameNs.camera.draw(canvas, ctx);
    gameNs.player.draw(canvas, ctx, deltaTime);
  }

  /**
  * Looks for keypresses and then carries out the appropriate function
  * @param {event} e The event to be handled
  */
  keyDownHandler(e)
  {
    if(e.keyCode === 37)
    {
      gameNs.player.move(-1,0);
      console.log("LEFT");
    }

    if(e.keyCode === 38)
    {
      gameNs.player.move(0,-1);
      console.log("UP");
    }

    if(e.keyCode === 39)
    {
      gameNs.player.move(1,0);
      console.log("RIGHT");
    }

    if(e.keyCode === 40)
    {
      gameNs.player.move(0,1);
      console.log("DOWN");
    }

    if(e.keyCode === 107)//zoomBy(1)
    {
      gameNs.camera.zoomBy(1);
    }

    if(e.keyCode === 109)//zoomBy(-1)
    {
      gameNs.camera.zoomBy(-1);
    }

    if(e.keyCode === 97) // zoomTo(1)
    {
      gameNs.camera.zoomTo(1);
    }

    if(e.keyCode === 98) // zoomTo(0.5)
    {
      gameNs.camera.zoomTo(0.5);
    }

    if(e.keyCode === 99) // zoomTo(1.5)
    {
      gameNs.camera.zoomTo(1.5);
    }
  }

  clickHandler(e)
  {
    console.log(e.clientX);
    console.log(e.clientY);
    const click = gameNs.camera.cameraToWorld(e.clientX, e.clientY);

    gameNs.player.warp(click.x, click.y);
    gameNs.camera.panTo(e.clientX,e.clientY);
  }
}
