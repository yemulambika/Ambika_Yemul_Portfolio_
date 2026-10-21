import { useState, useEffect, useCallback, useRef } from 'react';
import { portfolioAPI } from '../services/api';

export const useApi = (apiFn, deps = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  // Always call the LATEST apiFn (avoids stale search/filter params)
  const fnRef = useRef(apiFn);
  fnRef.current = apiFn;

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fnRef.current(...args);
      setData(res.data);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: fetchData };
};

export const useProfile = () => {
  const { data, loading, error, refetch } = useApi(portfolioAPI.getProfile, [], true);
  return { profile: data?.data || null, loading, error, refetch };
};

export const useProjects = (params) => {
  const key = JSON.stringify(params || {});
  const { data, loading, error, refetch } = useApi(
    () => portfolioAPI.getProjects(params),
    [key],
    true
  );
  return {
    projects: data?.data || [],
    total: data?.total || 0,
    pagination: data?.pagination || {},
    loading,
    error,
    refetch,
  };
};

export const useSkills = (params) => {
  const key = JSON.stringify(params || {});
  const { data, loading, error, refetch } = useApi(
    () => portfolioAPI.getSkills(params),
    [key],
    true
  );
  return {
    skills: data?.data || [],
    grouped: data?.grouped || {},
    loading,
    error,
    refetch,
  };
};

export const useExperience = () => {
  const { data, loading, error, refetch } = useApi(portfolioAPI.getExperience, [], true);
  return { experience: data?.data || [], loading, error, refetch };
};

export const useEducation = () => {
  const { data, loading, error, refetch } = useApi(portfolioAPI.getEducation, [], true);
  return { education: data?.data || [], loading, error, refetch };
};

export const useCertifications = (params) => {
  const key = JSON.stringify(params || {});
  const { data, loading, error, refetch } = useApi(
    () => portfolioAPI.getCertifications(params),
    [key],
    true
  );
  return {
    certifications: data?.data || [],
    total: data?.total || 0,
    pagination: data?.pagination || {},
    loading,
    error,
    refetch,
  };
};