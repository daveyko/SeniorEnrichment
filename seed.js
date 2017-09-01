const db = require ('./db')
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

const campuses = [

{ name: 'Patriots',
  image: 'https://cbssports.com/images/blogs/Family_Guy_NFL_Logos_Peter_Griffin_Patriots_Face_Pictures.png'
},

{ name: 'Seahawks',
  image: 'https://i.pinimg.com/736x/ca/18/29/ca182968badbf911221a012536634bf9--disney-pop-art-disney.jpg'
},

{
  name: 'Broncos',
  image: 'https://originaldave77.files.wordpress.com/2012/11/bronies-mlp-denver-broncos-dave-delisle-2012-davesgeekyideas-designer.png?w=567&h=427'
},

{
  name: 'Texans',
  image: 'http://nflrt.com/wp-content/uploads/2014/06/Texans.png'
},

{
  name: 'Bears',
  image: 'http://nationalfanthem.com/ShirtPieces/Chicago_Bears_Logo_Mike_Ditka_Superfan--ZM--NAVY.jpg'
}

]


const players = [
  {
    firstName: 'Tom',
    lastName: 'Brady',
    email: 'tb@tb.com',
    image: 'http://i.dailymail.co.uk/i/pix/2014/09/17/1410963484097_Image_galleryImage_image001_png.JPG',
    campusId: 1

  },

  {
    firstName: 'Marshawn',
    lastName: 'Lynch',
    email: 'ms@ms.com',
    image: 'http://i.dailymail.co.uk/i/pix/2014/09/17/1410963963363_wps_28_Marshawn_Lynch_Simpsonize.jpg',
    campusId: 2
  },

    {
    firstName: 'Peyton',
    lastName: 'Manning',
    email: 'pm@pm.com',
    image: 'http://i.dailymail.co.uk/i/pix/2014/09/17/1410962165087_Image_galleryImage_image001_png.JPG',
    campusId: 3
  },

    {
    firstName: 'JJ',
    lastName: 'Watt',
    email: 'jw@jw.com',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/b7/c4/fa/b7c4fa47c238d26f0e80b31d41be0989--simpsons-characters-houston-texans.jpg',
    campusId: 4
  },
    {
    firstName: 'Jay',
    lastName: 'Cutler',
    email: 'jc@jc.com',
    image: 'https://i.pinimg.com/736x/bb/2b/c2/bb2bc207340bb0e702a5decd263d9f91--smokin-jay-cutler-nfl-chicago-bears.jpg',
    campusId: 5
  }

]


const seed = () =>
  Promise.all(campuses.map(campus =>
                           Campus.create(campus)))
  .then(() =>
        Promise.all(players.map(player =>
                    Student.create(player))))

const main = () => {
  console.log('Syncing db...')
    db.sync({force: false})
  .then(() => {
    console.log('Seeding db...');
    return seed();
  })
  .catch(err => {
    console.log('error while seeding');
    console.log(err.stack)
  })
  .then(() => {
    db.close();
    return null
  })

}

main();
