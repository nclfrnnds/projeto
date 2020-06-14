module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define(
        "Autor", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkHistoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fkUsuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            principal: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "autores",
        }
    );

    Autor.associate = (models) => {
        /*Autor.belongsTo(models.Historia, {
            foreignKey: "fkHistoria",
        });
        Autor.belongsTo(models.Usuario, {
            foreignKey: "fkUsuario",
        });*/
    };

    return Autor;
};
