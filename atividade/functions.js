

function ganhar(){
  var originPoint = MovingCube.clone();
  var winPoint = mesh.clone();

  if(15 > distancePointToPoint(originPoint.position, winPoint.position)){
    console.log(originPoint.position);
    console.log(winPoint.position);
    alert("Parabéns, você ganhou!!");
          return true;
  }

  return false;
}

function perder(){
  var originPoint = mesh.clone();
  var lossPoint = obj_Lotso.clone();

  if(50 > distancePointToPoint(originPoint.position, lossPoint.position)){
    alert("Poxa, você encontrou o Lotso! Game Over");
          return true;
  }

  return false;
}

function colisaoBola(){
  var originPoint = obj_Woody.clone();
  var ballPoint = obj_Ball.clone();

  if(30 > distancePointToPoint(originPoint.position, ballPoint.position)){
    alert("Melhor tomar cuidado com a bola!!");
          return true;
  }

  return false;
}

function detection_colision_woody(direcao){
  var originPoint = MovingCube.clone();

  if(direcao == moveForward){
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
  } else if(direcao == moveBackward){
    moveForward = false;
    moveLeft = false;
    moveRight = false;
  } else if(direcao == moveLeft){
    moveForward = false;
    moveBackward = false;
    moveRight = false;
  } else if (direcao == moveRight){
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
  }

  for (var i = 0 ; i < ObjetosDeColisao.length ; i++){
    if(15 > distancePointToPoint(originPoint.position, ObjetosDeColisao[i].position)){
      return true;
    }
  }

  return false;
}

function distancePointToPoint(point, sphere) {
    var dx = point.x - sphere.x;
  var dz = point.z - sphere.z;
  var distance = Math.sqrt(dx * dx + dz * dz);

  return distance;
}


function move_bolinha(){
  obj_Ball.position.x = -10 + pontos.vertices[count].x * 10;
  obj_Ball.position.y = pontos.vertices[count].y * 10;
  obj_Ball.position.z = -30 + pontos.vertices[count].z * 10;
  obj_Ball.rotation.y += 0.05;
  if (count == 99)
    flag_lotso = false;
  else if (count == 0)
    flag_lotso = true;
  if (flag_lotso == true)
    count++;
  else
    count--;
}

function moving_woody(){
  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var delta = clock.getDelta();
    var moveDistance = 100 * delta;
      var keyCode = event.which;

      if (keyCode == 83 && !moveBackward) { //s
          obj_Woody.position.z += ySpeed;
          MovingCube.position.z = obj_Woody.position.z;
          mesh.position.z += xSpeed;
          moveBackward = detection_colision_woody(moveBackward);

      } else if (keyCode == 87 && (obj_Woody.position.z> -230) && !moveForward) { //w
          obj_Woody.position.z -= ySpeed;
          mesh.position.z -= ySpeed;
          MovingCube.position.z = obj_Woody.position.z;
          moveForward = detection_colision_woody(moveForward);

      } else if (keyCode == 65 && obj_Woody.position.x > -220 && !moveLeft) { //a
          obj_Woody.position.x -= xSpeed;
          mesh.position.x += xSpeed;
          MovingCube.position.x = obj_Woody.position.x;
          moveLeft = detection_colision_woody(moveLeft);
      } else if (keyCode == 68 && obj_Woody.position.x < 230&& !moveRight) {//d
          obj_Woody.position.x += xSpeed;
          mesh.position.x -= xSpeed;
          MovingCube.position.x = obj_Woody.position.x;
          moveRight = detection_colision_woody(moveRight);

      } else if (keyCode == 32) { //space
          obj_Woody.position.set(-200, 0, -220);
          mesh.position.set(200, 0, -220);
          MovingCube.position.set(-200, 0, -220);
      }
      else if (keyCode == 49){
          camera = camera1;
      }
      else if (keyCode == 50){
          camera = camera2;
      }

      if(ganhar()){
        obj_Woody.position.set(-200, 0, -220);
        MovingCube.position.set(-200, 0, -220);
        mesh.position.set(200, 0, -220);
      }

      if(colisaoBola()){
      obj_Woody.position.set(-200, 0, -220);
        MovingCube.position.set(-200, 0, -220);
        mesh.position.set(200, 0, -220);
      }

      if(perder()){
        obj_Woody.position.set(-200, 0, -220);
        MovingCube.position.set(-200, 0, -220);
        mesh.position.set(200, 0, -220);
      }

  };
}
