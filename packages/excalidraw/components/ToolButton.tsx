import "./ToolIcon.scss";

import type { CSSProperties } from "react";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useExcalidrawActionManager, useExcalidrawContainer } from "./App";
import { AbortError } from "../errors";
import Spinner from "./Spinner";
import type { PointerType } from "../element/types";
import { isPromiseLike } from "../utils";
import { actionToggleChatMenu } from "../actions/actionToggleChatMenu";

export type ToolButtonSize = "small" | "medium";

type ToolButtonBaseProps = {
  icon?: React.ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  "data-testid"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: ToolButtonSize;
  keyBindingLabel?: string | null;
  showAriaLabel?: boolean;
  hidden?: boolean;
  visible?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
};

type ToolButtonProps =
  | (ToolButtonBaseProps & {
    type: "button";
    children?: React.ReactNode;
    onClick?(event: React.MouseEvent): void;
  })
  | (ToolButtonBaseProps & {
    type: "submit";
    children?: React.ReactNode;
    onClick?(event: React.MouseEvent): void;
  })
  | (ToolButtonBaseProps & {
    type: "icon";
    children?: React.ReactNode;
    onClick?(): void;
  })
  | (ToolButtonBaseProps & {
    type: "radio";
    checked: boolean;
    onChange?(data: { pointerType: PointerType | null }): void;
    onPointerDown?(data: { pointerType: PointerType }): void;
  });

export const ToolButton = React.forwardRef((props: ToolButtonProps, ref) => {
  const { id: excalId } = useExcalidrawContainer();
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current);
  const sizeCn = `ToolIcon_size_${props.size}`;

  const [isLoading, setIsLoading] = useState(false);

  const isMountedRef = useRef(true);

  const onClick = async (event: React.MouseEvent) => {
    const ret = "onClick" in props && props.onClick?.(event);

    if (isPromiseLike(ret)) {
      try {
        setIsLoading(true);
        await ret;
      } catch (error: any) {
        if (!(error instanceof AbortError)) {
          throw error;
        } else {
          console.warn(error);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const lastPointerTypeRef = useRef<PointerType | null>(null);

  if (
    props.type === "button" ||
    props.type === "icon" ||
    props.type === "submit"
  ) {
    const type = (props.type === "icon" ? "button" : props.type) as
      | "button"
      | "submit";
    return (
      <button
        className={clsx(
          "ToolIcon_type_button",
          sizeCn,
          props.className,
          props.visible && !props.hidden
            ? "ToolIcon_type_button--show"
            : "ToolIcon_type_button--hide",
          {
            ToolIcon: !props.hidden,
            "ToolIcon--selected": props.selected,
            "ToolIcon--plain": props.type === "icon",
          },
        )}
        style={props.style}
        data-testid={props["data-testid"]}
        hidden={props.hidden}
        title={props.title}
        aria-label={props["aria-label"]}
        type={type}
        onClick={onClick}
        ref={innerRef}
        disabled={isLoading || props.isLoading || !!props.disabled}
      >
        {(props.icon || props.label) && (
          <div
            className="ToolIcon__icon"
            aria-hidden="true"
            aria-disabled={!!props.disabled}
          >
            {props.icon || props.label}
            {props.keyBindingLabel && (
              <span className="ToolIcon__keybinding">
                {props.keyBindingLabel}
              </span>
            )}
            {props.isLoading && <Spinner />}
          </div>
        )}
        {props.showAriaLabel && (
          <div className="ToolIcon__label">
            {props["aria-label"]} {isLoading && <Spinner />}
          </div>
        )}
        {props.children}
      </button>
    );
  }
  const actionManager = useExcalidrawActionManager();

  return (
    <label
      className={clsx("ToolIcon", props.className)}
      title={props.title}
      onPointerDown={(event) => {
        lastPointerTypeRef.current = event.pointerType || null;
        props.onPointerDown?.({ pointerType: event.pointerType || null });
      }}
      onPointerUp={() => {
        requestAnimationFrame(() => {
          lastPointerTypeRef.current = null;
        });
      }}
    >
      <input
        className={`ToolIcon_type_radio ${sizeCn}`}
        type="radio"
        name={props.name}
        aria-label={props["aria-label"]}
        aria-keyshortcuts={props["aria-keyshortcuts"]}
        data-testid={props["data-testid"]}
        id={`${excalId}-${props.id}`}
        onChange={() => {
          if(props["data-testid"] === 'toolbar-chat'){
            actionManager.executeAction(actionToggleChatMenu);
          }else{
            props.onChange?.({ pointerType: lastPointerTypeRef.current });
          }
        }}
        checked={props.checked}
        ref={innerRef}
      />
      <div className="ToolIcon__icon">
        {props.icon}
        {props.keyBindingLabel && (
          <span className="ToolIcon__keybinding">{props.keyBindingLabel}</span>
        )}
      </div>
      {(props["aria-keyshortcuts"] && ['i', 'c', 'm', 'I', 'C', 'M']?.indexOf(props["aria-keyshortcuts"]) > -1) &&
        <div
          style={{
            display: "inline-flex",
            marginLeft: "auto",
            padding: "2px 4px",
            borderRadius: 6,
            fontSize: 8,
            fontFamily: "Cascadia, monospace",
            position: "absolute",
            background: "var(--color-promo)",
            color: "var(--color-surface-lowest)",
            top: 0,
            right: 0,
          }}
        >
          AI
        </div>
      }
    </label>
  );
});

ToolButton.defaultProps = {
  visible: true,
  className: "",
  size: "medium",
};

ToolButton.displayName = "ToolButton";
