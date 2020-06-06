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
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            senha: DataTypes.STRING,
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
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
        }
    );

    Usuario.associate = (models) => {
        Usuario.belongsToMany(models.Historia, {
            foreignKey: "fkUsuario",
            through: models.Autor,
        });
    };

    return Usuario;
};
