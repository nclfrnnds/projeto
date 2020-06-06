module.exports = (sequelize, DataTypes) => {
    const Capitulo = sequelize.define(
        "Capitulo", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fkHistoria: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            visivel: DataTypes.BOOLEAN,
            notasIniciais: DataTypes.TEXT,
            titulo: DataTypes.STRING,
            texto: DataTypes.STRING,
            notasFinais: DataTypes.TEXT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
        }
    );

    Capitulo.associate = (models) => {
        Capitulo.belongsTo(models.Historia, {
            foreignKey: "fkHistoria",
        });
    };

    return Capitulo;
};
