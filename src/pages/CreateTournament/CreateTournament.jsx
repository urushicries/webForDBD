import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { submitPost, uploadImage } from '../../utils/tournamentStore';
import styles from './CreateTournament.module.css';

export default function CreateTournament() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, banner: t('createTournament.errors.bannerFileType') }));
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, banner: t('createTournament.errors.bannerSize') }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setBannerPreview(ev.target.result);
      setBannerData(ev.target.result);
      setErrors((prev) => ({ ...prev, banner: undefined }));
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setBannerPreview(null);
    setBannerData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = t('createTournament.errors.titleRequired');
    else if (title.trim().length > 100) errs.title = t('createTournament.errors.titleLength');
    if (!description.trim()) errs.description = t('createTournament.errors.descRequired');
    else if (description.trim().length > 1200) errs.description = t('createTournament.errors.descLength');
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await submitPost({ title, description, banner: bannerData });
      setSubmitted(true);
    } catch {
      setErrors((prev) => ({ ...prev, submit: t('createTournament.errors.submitFailed') }));
    }
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <p className={styles.successIcon} aria-hidden="true">✓</p>
            <h2 className={styles.successHeading}>{t('createTournament.successHeading')}</h2>
            <p className={styles.successSub}>
              {t('createTournament.successSub')}
            </p>
            <div className={styles.successActions}>
              <Link to="/tournaments" className={styles.btnPrimary}>
                {t('createTournament.backTournaments')}
              </Link>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setBannerPreview(null);
                  setBannerData(null);
                  setErrors({});
                  setSubmitted(false);
                }}
              >
                {t('createTournament.submitAnother')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.tag}>{t('createTournament.tag')}</p>
          <h1 className={styles.title}>{t('createTournament.title')}</h1>
          <p className={styles.subtitle}>
            {t('createTournament.subtitle')}
          </p>
        </div>
        <div className={styles.headerRule} aria-hidden="true" />
      </header>

      {/* ── Form ────────────────────────────────────────────────── */}
      <main className={styles.formSection}>
        <div className={styles.formInner}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Create tournament post"
          >
            {/* Banner upload */}
            <div className={styles.field}>
              <label className={styles.label}>{t('createTournament.bannerImage')}</label>
              <p className={styles.hint}>{t('createTournament.bannerHint')}</p>

              {bannerPreview ? (
                <div className={styles.previewWrap}>
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className={styles.previewImg}
                  />
                  <button
                    type="button"
                    className={styles.removeImgBtn}
                    onClick={removeImage}
                    aria-label={t('createTournament.removeImage')}
                  >
                    {t('createTournament.removeImage')}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className={styles.uploadIcon} aria-hidden="true">↑</span>
                  {t('createTournament.chooseImage')}
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={handleImageChange}
                aria-hidden="true"
                tabIndex={-1}
              />
              {errors.banner && <p className={styles.error}>{errors.banner}</p>}
            </div>

            {/* Title */}
            <div className={styles.field}>
              <label htmlFor="title" className={styles.label}>
                {t('createTournament.tournamentName')} <span className={styles.required}>{t('createTournament.required')}</span>
              </label>
              <input
                id="title"
                type="text"
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder={t('createTournament.placeholder')}
                maxLength={100}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              <div className={styles.fieldFooter}>
                {errors.title ? (
                  <p id="title-error" className={styles.error}>{errors.title}</p>
                ) : (
                  <span />
                )}
                <span className={styles.charCount}>{title.length}/100</span>
              </div>
            </div>

            {/* Description */}
            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>
                {t('createTournament.description')} <span className={styles.required}>{t('createTournament.required')}</span>
              </label>
              <textarea
                id="description"
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder={t('createTournament.descPlaceholder')}
                maxLength={1200}
                rows={7}
                aria-describedby={errors.description ? 'desc-error' : undefined}
              />
              <div className={styles.fieldFooter}>
                {errors.description ? (
                  <p id="desc-error" className={styles.error}>{errors.description}</p>
                ) : (
                  <span />
                )}
                <span className={styles.charCount}>{description.length}/1200</span>
              </div>
            </div>

            {/* Actions */}
            {errors.submit && <p className={styles.error}>{errors.submit}</p>}
            <div className={styles.actions}>
              <Link to="/tournaments" className={styles.btnGhost}>
                {t('createTournament.cancel')}
              </Link>
              <button type="submit" className={styles.btnPrimary}>
                {t('createTournament.submitReview')}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
