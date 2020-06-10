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
            titulo: DataTypes.STRING,
            texto: DataTypes.STRING,
            notasIniciais: DataTypes.TEXT,
            notasFinais: DataTypes.TEXT,
            visivel: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "capitulos",
        }
    );

    Capitulo.associate = (models) => {
        Capitulo.belongsTo(models.Historia, {
            foreignKey: "fkHistoria",
        });
    };

    return Capitulo;
};
