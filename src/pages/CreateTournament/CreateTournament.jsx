import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitPost } from '../../utils/tournamentStore';
import styles from './CreateTournament.module.css';

export default function CreateTournament() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
      setErrors((prev) => ({ ...prev, banner: 'File must be an image.' }));
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, banner: 'Image must be smaller than 4 MB.' }));
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
    if (!title.trim()) errs.title = 'Tournament name is required.';
    else if (title.trim().length > 100) errs.title = 'Name must be 100 characters or fewer.';
    if (!description.trim()) errs.description = 'Description is required.';
    else if (description.trim().length > 1200) errs.description = 'Description must be 1200 characters or fewer.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    submitPost({ title, description, banner: bannerData });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <p className={styles.successIcon} aria-hidden="true">✓</p>
            <h2 className={styles.successHeading}>Post Submitted</h2>
            <p className={styles.successSub}>
              Your tournament ad has been sent for moderation. It will appear on the
              Tournaments page once approved.
            </p>
            <div className={styles.successActions}>
              <Link to="/tournaments" className={styles.btnPrimary}>
                Back to Tournaments
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
                Submit Another
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
          <p className={styles.tag}>Competitive DBD</p>
          <h1 className={styles.title}>Post a Tournament</h1>
          <p className={styles.subtitle}>
            Fill in the details below. Posts go through a quick moderation review
            before appearing publicly.
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
              <label className={styles.label}>Banner Image</label>
              <p className={styles.hint}>Optional · max 4 MB · any common image format</p>

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
                    aria-label="Remove image"
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className={styles.uploadIcon} aria-hidden="true">↑</span>
                  Choose Image
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
                Tournament Name <span className={styles.required}>*</span>
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
                placeholder="e.g. DBD Winter Invitational 2026"
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
                Description <span className={styles.required}>*</span>
              </label>
              <textarea
                id="description"
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder="Format, dates, bracket size, sign-up link, prize pool..."
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
            <div className={styles.actions}>
              <Link to="/tournaments" className={styles.btnGhost}>
                Cancel
              </Link>
              <button type="submit" className={styles.btnPrimary}>
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
