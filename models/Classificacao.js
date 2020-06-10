module.exports = (sequelize, DataTypes) => {
    const Classificacao = sequelize.define (
        "Classificacao", {
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
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
            tableName: "classificacoes",
            //freezeTableName: true,
        }
    );

    Classificacao.associate = (models) => {
        Classificacao.hasMany(models.Historia, {
            foreignKey: "fkClassificacao",
        });
    };

    return Classificacao;
};
