create table "usuarios" (
    "id_usuario" serial,
    "nome" varchar(60),
    "email" varchar(60) not null unique,
    "senha" varchar(200),
    "criado_em" timestamp,
    "atualizado_em" timestamp,
    primary key ("id_usuario")
)

create table "tasks" (
    "id_task" serial,
    "descricao" varchar(60),
    "data_estimada" timestamp,
    "data_concluida" timestamp,
    "id_proprietario" int,
    "status" boolean,
    "criado_em" timestamp,
    "atualizado_em" timestamp,
    primary key ("id_task"),
    constraint id_proprietario foreign key (id_proprietario) references usuarios(id_usuario)
)