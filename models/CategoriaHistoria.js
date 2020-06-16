module.exports = (sequelize, DataTypes) => {
    const CategoriaHistoria = sequelize.define(
        "CategoriaHistoria", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkHistoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fkCategoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            principal: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "categoriasHistorias",
        }
    );

    CategoriaHistoria.associate = (models) => {
        /*CategoriaHistoria.belongsTo(models.Historia, {
            foreignKey: "fkHistoria",
        });
        CategoriaHistoria.belongsTo(models.Categoria, {
            foreignKey: "fkCategoria",
        });*/ 
    };

    return CategoriaHistoria;
};
