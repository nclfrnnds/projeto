module.exports = (sequelize, DataTypes) => {
    const GenerosHistoria = sequelize.define(
        "GenerosHistoria", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkHistoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fkGenero: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            principal: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "generosHistoria",
        }
    );

    GenerosHistoria.associate = (models) => {
        /*GenerosHistoria.belongsTo(models.Historia, {
            foreignKey: "fkHistoria",
        });
        GenerosHistoria.belongsTo(models.Genero, {
            foreignKey: "fkGenero",
        });*/
    };
    
    return GenerosHistoria;
};
