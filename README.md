<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# para iniciar el proyecto:

1. crea las credenciales en un archivo .env como esta en la plantilla para que se pueda conectar a la base de datos

"
.env.template
"

2. para levantar el docker primero fijate que esté corriendo, y corre el siguiente comando

"""
docker-compose up -d    o    docker compose up -d
"""

3. para crear el seed de role haz peticiones a los siguientes endpoints (en el orden que se muestran):

"""
Get api/v1/seed/role
"""

"""
Get api/v1/seed
"""

