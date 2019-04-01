import axios from 'axios';

const KEY = '11730e31820bef72836b43f4f01d1aa7';
const axiosAPIrequest = async query => {
  try {
    const result = await axios(
      `https://www.food2fork.com/api/search?key=${KEY}&q=${query}`
    );
    const {
      data: { recipes }
    } = result;

    console.info({ recipes });
  } catch (error) {
    console.error(error);
  }
};

axiosAPIrequest('pizza');
