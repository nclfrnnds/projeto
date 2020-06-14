module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define (
        "Usuario", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nomeUsuario: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nome: DataTypes.STRING,
            avatar: DataTypes.STRING,
            descricao: DataTypes.TEXT,
            dataNascimento: DataTypes.DATEONLY,
            genero: DataTypes.STRING,
            localizacao: DataTypes.STRING,
            emailSecundario: {
                type: DataTypes.STRING,
                unique: true,
            },
            celular: {
                type: DataTypes.BIGINT,
                unique: true,
            },
            moderador: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "usuarios",
        }
    );

    Usuario.associate = (models) => {
        /*Usuario.hasMany(models.Autor, {
            foreignKey: "fkUsuario",
        });*/
        Usuario.belongsToMany(models.Historia, {
            foreignKey: "fkUsuario",
            sourceKey: "id",
            targetKey: "id",
            through: models.Autor,
        });
    };

    return Usuario;
};
