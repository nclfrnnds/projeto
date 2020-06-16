module.exports = (sequelize, DataTypes) => {
    const Historia = sequelize.define(
        "Historia", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkClassificacao: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            titulo: DataTypes.STRING,
            capa: DataTypes.STRING,
            sinopse: DataTypes.TEXT,
            finalizada: DataTypes.BOOLEAN,
            interativa: DataTypes.BOOLEAN,
            visivel: DataTypes.BOOLEAN,
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
        Historia.hasMany(models.Capitulo, {
            foreignKey: "fkHistoria",
        });
        /*Historia.hasMany(models.Autor, {
            foreignKey: "fkHistoria",
        });
        Historia.hasMany(models.GeneroHistoria, {
            foreignKey: "fkHistoria",
        });
        Historia.hasMany(models.CategoriaHistoria, {
            foreignKey: "fkHistoria",
        });*/
        Historia.belongsToMany(models.Usuario, {
            foreignKey: "fkHistoria",
            sourceKey: "id",
            targetKey: "id",
            through: models.Autor,
        });
        Historia.belongsToMany(models.Genero, {
            foreignKey: "fkHistoria",
            sourceKey: "id",
            targetKey: "id",
            through: models.GeneroHistoria,
        });
        Historia.belongsToMany(models.Categoria, {
            foreignKey: "fkHistoria",
            sourceKey: "id",
            targetKey: "id",
            through: models.CategoriaHistoria,
        });
    };

    return Historia;
};
