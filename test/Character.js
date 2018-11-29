class Character
{
  /**
   * constructor of the Player object.
   */
  constructor(x, y)
  {
    this.x = x;
    this.y = y;

    this.size = 5;

    this.vel = {
      x: x,
      y: y
    };

    this.speed = 5;
  }

  /**
  * Updates the Player object
  */
  update()
  {
    // Move character
  }

  draw(canvas, ctx, deltaTime)
  {
    ctx.fillStyle = "#FFFFFF";

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size,
    );
  }

  move(val)
  {
    this.x += val;
  }
} 
