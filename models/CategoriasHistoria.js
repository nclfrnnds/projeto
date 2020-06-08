module.exports = (sequelize, DataTypes) => {
    const CategoriasHistoria = sequelize.define(
        "CategoriasHistoria", {
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
            tableName: "categoriasHistoria",
        }
    );

    CategoriasHistoria.associate = (models) => {

    };

    return CategoriasHistoria;
};
