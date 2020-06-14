module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        "Categoria", {
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
            tableName: "categorias",
            //freezeTableName: true,
        }
    );

    Categoria.associate = (models) => {
        /*Categoria.hasMany(models.CategoriasHistoria, {
            foreignKey: "fkCategoria",
        });*/
        Categoria.belongsToMany(models.Historia, {
            foreignKey: "fkCategoria",
            sourceKey: "id",
            targetKey: "id",
            through: models.CategoriasHistoria,
        });
    };

    return Categoria;
};
