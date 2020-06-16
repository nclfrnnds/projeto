module.exports = (sequelize, DataTypes) => {
    const GeneroHistoria = sequelize.define(
        "GeneroHistoria", {
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
            tableName: "generosHistorias",
        }
    );

    GeneroHistoria.associate = (models) => {
        /*GeneroHistoria.belongsTo(models.Historia, {
            foreignKey: "fkHistoria",
        });
        GeneroHistoria.belongsTo(models.Genero, {
            foreignKey: "fkGenero",
        });*/
    };
    
    return GeneroHistoria;
};
