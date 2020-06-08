module.exports = (sequelize, DataTypes) => {
    const Historia = sequelize.define(
        "Historia", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            visivel: DataTypes.BOOLEAN,
            titulo: DataTypes.STRING,
            sinopse: DataTypes.TEXT,
            capa: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            interativa: DataTypes.BOOLEAN,
            fkClassificacao: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "historias",
        }
    );

    Historia.associate = (models) => {
        Historia.belongsTo(models.Classificacao, {
            foreignKey: "fkClassificacao",
        });
        Historia.belongsToMany(models.Usuario, {
            foreignKey: "fkHistoria",
            through: models.Autor,
        });
        Historia.belongsToMany(models.Genero, {
            foreignKey: "fkHistoria",
            through: models.GenerosHistoria,
        });
        Historia.belongsToMany(models.Categoria, {
            foreignKey: "fkHistoria",
            through: models.CategoriasHistoria,
        });
    };

    return Historia;
};
