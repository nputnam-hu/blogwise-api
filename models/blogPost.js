module.exports = function defineBlogPost(sequelize, DataTypes) {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    coverPhotoUri: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    htmlBody: {
      type: DataTypes.TEXT,
    },
    publishDate: {
      type: DataTypes.DATE,
    },
    tags: {
      type: DataTypes.JSONB,
    },
    scheduledPublishDate: {
      type: DataTypes.DATE,
    },
    slug: {
      type: DataTypes.STRING,
    },
    thumbnailUri: {
      type: DataTypes.STRING,
    },
    hasBeenPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  BlogPost.associate = function buildBlog(models) {
    BlogPost.belongsTo(models.User)
  }

  return BlogPost
}
