"use client";

import {
  useState,
  useEffect,
} from "react";

const TOAST_LIMIT = 20;

const TOAST_REMOVE_DELAY =
  1000000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST:
    "UPDATE_TOAST",
  DISMISS_TOAST:
    "DISMISS_TOAST",
  REMOVE_TOAST:
    "REMOVE_TOAST",
};

let count = 0;

function genId() {
  count =
    (count + 1) %
    Number.MAX_VALUE;

  return count.toString();
}

/** @type {Map<string, ReturnType<typeof setTimeout>>} */
const toastTimeouts =
  new Map();

/** @type {Array<(state: any) => void>} */
const listeners = [];

/** @type {{toasts:any[]}} */
let memoryState = {
  toasts: [],
};

/**
 * @param {string} toastId
 */
function addToRemoveQueue(
  toastId
) {
  if (
    toastTimeouts.has(
      toastId
    )
  ) {
    return;
  }

  const timeout =
    setTimeout(() => {
      toastTimeouts.delete(
        toastId
      );

      dispatch({
        type:
          actionTypes.REMOVE_TOAST,
        toastId,
      });
    }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(
    toastId,
    timeout
  );
}
/**
 * @param {any} state
 * @param {any} action
 */
export function reducer(
  state,
  action
) {
  switch (
    action.type
  ) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [
          action.toast,
          ...state.toasts,
        ].slice(
          0,
          TOAST_LIMIT
        ),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts:
          state.toasts.map(
            /** @param {any} t */
            (t) =>
              t.id ===
              action.toast.id
                ? {
                    ...t,
                    ...action.toast,
                  }
                : t
          ),
      };

    case actionTypes.DISMISS_TOAST:
      if (
        action.toastId
      ) {
        addToRemoveQueue(
          action.toastId
        );
      }

      return {
        ...state,
        toasts:
          state.toasts.map(
            /** @param {any} t */
            (t) =>
              t.id ===
                action.toastId ||
              action.toastId ===
                undefined
                ? {
                    ...t,
                    open:
                      false,
                  }
                : t
          ),
      };

    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts:
          action.toastId
            ? state.toasts.filter(
                /** @param {any} t */
                (t) =>
                  t.id !==
                  action.toastId
              )
            : [],
      };

    default:
      return state;
  }
}

/**
 * @param {any} action
 */
function dispatch(
  action
) {
  memoryState =
    reducer(
      memoryState,
      action
    );

  listeners.forEach(
    (
      listener
    ) => {
      listener(
        memoryState
      );
    }
  );
}

/**
 * @param {any} props
 */
export function toast(
  props
) {
  const id =
    genId();

  const dismiss =
    () =>
      dispatch({
        type:
          actionTypes.DISMISS_TOAST,
        toastId:
          id,
      });

  /**
   * @param {any} nextProps
   */
  const update =
    (
      nextProps
    ) =>
      dispatch({
        type:
          actionTypes.UPDATE_TOAST,
        toast: {
          ...nextProps,
          id,
        },
      });

  dispatch({
    type:
      actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open:
        true,

      /** @param {boolean} open */
      onOpenChange:
        (
          open
        ) => {
          if (
            !open
          ) {
            dismiss();
          }
        },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast() {
  const [
    state,
    setState,
  ] =
    useState(
      memoryState
    );

  useEffect(() => {
    listeners.push(
      setState
    );

    return () => {
      const index =
        listeners.indexOf(
          setState
        );

      if (
        index >
        -1
      ) {
        listeners.splice(
          index,
          1
        );
      }
    };
  }, []);

  /**
   * @param {string=} toastId
   */
  const dismiss =
    (
      toastId
    ) =>
      dispatch({
        type:
          actionTypes.DISMISS_TOAST,
        toastId,
      });

  return {
    ...state,
    toast,
    dismiss,
  };
}