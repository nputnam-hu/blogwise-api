const DEFAULT_INDEX_IMG =
  'https://s3.amazonaws.com/megaphone-logo-uploads/defaultLogo.png'

module.exports = function defineBlog(sequelize, DataTypes) {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    siteUrl: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    bgImgUri: {
      type: DataTypes.STRING,
    },
    headerPhotoUri: {
      type: DataTypes.STRING,
      defaultValue: DEFAULT_INDEX_IMG,
    },
    sidebarPhotoUri: {
      type: DataTypes.STRING,
      defaultValue: DEFAULT_INDEX_IMG,
    },
    faviconPhotoUri: {
      type: DataTypes.STRING,
    },
    backgroundHexCode: {
      type: DataTypes.STRING,
      defaultValue: '#ffffff',
    },
    headerTextColor: {
      type: DataTypes.STRING,
      defaultValue: '#000000',
    },
    navbarHexCode: {
      type: DataTypes.STRING,
    },
    mainSiteUrl: {
      type: DataTypes.STRING,
    },
    twitterUrl: {
      type: DataTypes.STRING,
    },
    facebookUrl: {
      type: DataTypes.STRING,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
    },
    sslActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    customNavbarLinks: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    tags: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    hasUpdates: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Blog.associate = function buildBlog(models) {
    Blog.hasOne(models.ProdInstance)
    Blog.hasMany(models.BlogPost, { as: 'blogPosts', foreignKey: 'blogId' })
  }

  return Blog
}
