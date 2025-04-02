import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useRealtime(table, column, callback, dependencies = []) {
  const [subscription, setSubscription] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clean up previous subscription if it exists
    if (subscription) {
      subscription.unsubscribe();
    }

    // Create a new subscription
    const newSubscription = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          ...(column ? { filter: `${column}=eq.${dependencies[0]}` } : {})
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          setIsSubscribed(true);
        } else if (status === 'CHANNEL_ERROR') {
          setError(err);
          setIsSubscribed(false);
        }
      });

    setSubscription(newSubscription);

    // Clean up subscription when component unmounts
    return () => {
      if (newSubscription) {
        newSubscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { isSubscribed, error };
}

// Specific hook for property changes
export function usePropertyChanges(propertyId, callback) {
  return useRealtime('properties', propertyId ? 'id' : null, callback, propertyId ? [propertyId] : []);
}

// Hook for new property listings
export function useNewPropertyListings(callback) {
  return useRealtime('properties', null, (payload) => {
    if (payload.eventType === 'INSERT') {
      callback(payload.new);
    }
  }, []);
}

// Hook for property status changes
export function usePropertyStatusChanges(callback) {
  return useRealtime('properties', null, (payload) => {
    if (payload.eventType === 'UPDATE' && payload.old.active !== payload.new.active) {
      callback(payload.new);
    }
  }, []);
}

// Hook for property price updates
export function usePropertyPriceUpdates(callback) {
  return useRealtime('properties', null, (payload) => {
    if (payload.eventType === 'UPDATE' && payload.old.price !== payload.new.price) {
      callback({
        property: payload.new,
        oldPrice: payload.old.price,
        newPrice: payload.new.price
      });
    }
  }, []);
}