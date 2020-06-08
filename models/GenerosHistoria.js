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

    };
    
    return GenerosHistoria;
};
