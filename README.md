# Prueba - SQS

Se desarrolló la prueba utilizando Node JS, Serverless framework y Alpine-SQS como sistema de colas local

# Alpine-SQS
Alpine SQS es un contenedor que contiene una implementacion hecha en Java de AWS-SQS. Esta basada en ElasticMQ y permite levantar un entorno local evitando costos de infraestructura.

Una vez levantado el contenedor, puede acceder a http://localhost:9325/ donde encontrará una interfaz gráfica para visualizar los mensajes que se encuentran en cola.

## Requerimientos

- Docker
- Node JS
- Serverless framework

## Notas
El archivo de configuración de Serverless está preparado para levantar una SQS en AWS. Para evitar recurir en costos, se instaló Alpine-SQS para simular una SQS localmente, por lo que las lambda estan apuntando a la queue de Alpine y no de AWS.

## Instalación

1) Dentro de la raíz del proyecto se encuentra el archivo de configuración de Docker que contiene el setup de Alpine-SQS. 

Para levantar el contenedor, deberán ejecutar en la carpeta del proyecto el siguiente comando:

```bash
docker-compose up -d
```

2) Dentro de la carpeta raíz, ejecutar el siguiente comando para instalar las dependencias.

```bash
npm install
```

## Configuración
Dentro de la carpeta raíz se encuentra un archivo ".env" que contiene los siguientes parametros:
- SQS_URL: endpoint de la cola de mensajes. Dejar la que viene por defecto
- DISCORD_WEBHOOK: webhook de Discord.


## Inicio
```bash
npm start
```


## API

### Send message
- Endpoint: /dev/message/send
- Type: POST
- Parámetros
    {
        "id": "1",
        "message": "prueba"
    }
- Detalle: envía el mensaje a la cola. El mismo se puede visualizar desde la UI de Alpine-SQS

#### Receive message
- Endpoint: /dev/message/receive
- Type: POST
- Parámetros
    {
        "id": "1",
        "message": "prueba"
    }
- Detalle: obtiene el primer mensaje ingresado en la cola. El mismo es enviado al webhook de Discord.