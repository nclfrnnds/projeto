module.exports = (sequelize, DataTypes) => {
    const Classificacao = sequelize.define (
        "Classificacao", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            classificacao: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            timestamps: false,
        }
    );

    Classificacao.associate = (models) => {

    };

    return Classificacao;
};
