import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { Container } from './styles';
import { insertImageRequest } from '~/store/modules/meetapp/actions';

function InputBanner({ previewURL }) {
  const dispatch = useDispatch();
  const { defaultValue, registerField } = useField('banner');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const banner = useSelector(state => state.meetapp.image);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }

    if (banner) {
      const { id, url } = banner;
      setFile(id);
      setPreview(url);
    } else if (previewURL) {
      setPreview(previewURL);
    }

    // eslint-disable-next-line
  }, [ref.current, banner]);

  async function handleChange(e) {
    dispatch(insertImageRequest(e.target.files[0]));
  }

  return (
    <Container>
      <label htmlFor="banner">
        <img src={preview} alt="" />

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

InputBanner.propTypes = {
  previewURL: PropTypes.string,
};

export default InputBanner;
