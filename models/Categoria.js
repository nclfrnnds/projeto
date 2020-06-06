module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        "Categoria", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            categoria: DataTypes.STRING,
            descricao: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
        }
    );

    Categoria.associate = (models) => {
        Categoria.belongsToMany(models.Historia, {
            foreignKey: "fkCategoria",
            through: models.CategoriasHistoria,
        });
    };

    return Categoria;
};
