module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define(
        "Genero", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            descricao: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "generos",
            //freezeTableName: true,
        }
    );

    Genero.associate = (models) => {
        /*Genero.hasMany(models.GenerosHistoria, {
            foreignKey: "fkGenero",
        });*/
        Genero.belongsToMany(models.Historia, {
            foreignKey: "fkGenero",
            sourceKey: "id",
            targetKey: "id",
            through: models.GenerosHistoria,
        });
    };

    return Genero;
};
