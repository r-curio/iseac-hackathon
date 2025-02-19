"use client";
import { useContext, useRef, useState } from "react";
import {
  MdCode,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight /* ...other imports */,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo,
} from "react-icons/md";
import {
  BaseEditor,
  Descendant,
  Editor,
  Element,
  Transforms,
  createEditor,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, useSlate, withReact } from "slate-react";
import { useEditor } from "@/providers/editor-provider";
import { CustomElement, CustomText } from "@/providers/editor-provider";
import {
  AlignType,
  CustomElementType,
  HOTKEYS,
  ICON_SIZE,
  LIST_TYPES,
  ListType,
  TEXT_ALIGN_TYPES,
} from "@/lib/utils";

import "./styles/RichTextbox.css";

interface CustomEditorType {
  isMarkActive: (
    editor: BaseEditor & ReactEditor,
    format: keyof Omit<CustomText, "text">,
  ) => boolean;
  isBlockActive: (
    editor: BaseEditor & ReactEditor,
    format: string,
    blockType?: "type" | "align",
  ) => boolean;
  toggleMark: (
    editor: BaseEditor & ReactEditor,
    format: keyof Omit<CustomText, "text">,
  ) => void;
  toggleBlock: (
    editor: BaseEditor & ReactEditor,
    format: CustomElementType,
  ) => void;
}

const CustomEditor: CustomEditorType = {
  isMarkActive(editor, format) {
    try {
      const marks = Editor.marks(editor);
      return marks ? marks[format] === true : false;
    } catch (error) {
      return false;
    }
  },

  isBlockActive(editor, format, blockType = "type") {
    const { selection } = editor;
    if (!selection) return false;

    try {
      const [match] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            n[blockType] === format,
        }),
      );

      return !!match;
    } catch (error) {
      return false;
    }
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format as AlignType) ? "align" : "type",
    );
    const isList = LIST_TYPES.includes(format as ListType);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type as ListType) &&
        !TEXT_ALIGN_TYPES.includes(format as AlignType),
      split: true,
    });

    let newProperties: Partial<CustomElement>;
    if (TEXT_ALIGN_TYPES.includes(format as AlignType)) {
      newProperties = { align: isActive ? undefined : (format as AlignType) };
    } else {
      newProperties = {
        type: isActive
          ? "paragraph"
          : isList
            ? "list-item"
            : (format as CustomElement["type"]),
      };
    }

    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block: CustomElement = {
        type: format as CustomElementType,
        children: [],
      };
      Transforms.wrapNodes(editor, block);
    }
  },
};

interface ButtonProps {
  format: string;
  icon: React.ReactNode;
}

const MarkButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <button
      type="button"
      data-active={CustomEditor.isMarkActive(
        editor,
        format as keyof Omit<CustomText, "text">,
      )}
      onClick={(e) => {
        e.preventDefault();
        CustomEditor.toggleMark(
          editor,
          format as keyof Omit<CustomText, "text">,
        );
      }}
    >
      {icon}
    </button>
  );
};

const BlockButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <button
      type="button"
      data-active={CustomEditor.isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format as AlignType) ? "align" : "type",
      )}
      onClick={(e) => {
        e.preventDefault();
        CustomEditor.toggleBlock(editor, format as CustomElementType);
      }}
    >
      {icon}
    </button>
  );
};

const RichTextbox: React.FC = () => {
  const { renderElement, renderLeaf, contentValue, changeContentValue } =
    useEditor();
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const handleChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => op.type !== "set_selection",
    );

    if (isAstChange) changeContentValue(value);
  };

  return (
    <Slate editor={editor} initialValue={contentValue} onChange={handleChange}>
      <div className="editor w-full rounded-xl">
        <div className="editor__toolbar">
          <MarkButton format="bold" icon={<MdFormatBold size={ICON_SIZE} />} />
          <MarkButton
            format="italic"
            icon={<MdFormatItalic size={ICON_SIZE} />}
          />
          <MarkButton
            format="underline"
            icon={<MdFormatUnderlined size={ICON_SIZE} />}
          />
          <MarkButton format="code" icon={<MdCode size={ICON_SIZE} />} />
          <BlockButton
            format="heading_one"
            icon={<MdLooksOne size={ICON_SIZE} />}
          />
          <BlockButton
            format="heading_two"
            icon={<MdLooksTwo size={ICON_SIZE} />}
          />
          <BlockButton
            format="block-quote"
            icon={<MdFormatQuote size={ICON_SIZE} />}
          />
          <BlockButton
            format="numbered-list"
            icon={<MdFormatListNumbered size={ICON_SIZE} />}
          />
          <BlockButton
            format="bulleted-list"
            icon={<MdFormatListBulleted size={ICON_SIZE} />}
          />
          <BlockButton
            format="left"
            icon={<MdFormatAlignLeft size={ICON_SIZE} />}
          />
          <BlockButton
            format="center"
            icon={<MdFormatAlignCenter size={ICON_SIZE} />}
          />
          <BlockButton
            format="right"
            icon={<MdFormatAlignRight size={ICON_SIZE} />}
          />
          <BlockButton
            format="justify"
            icon={<MdFormatAlignJustify size={ICON_SIZE} />}
          />
        </div>
        <Editable
          className="editor__content"
          id="content"
          name="content"
          spellCheck
          placeholder="Add your content here..."
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.ctrlKey && event.key in HOTKEYS) {
              event.preventDefault();
              const mark = HOTKEYS[event.key];
              CustomEditor.toggleMark(
                editor,
                mark as keyof Omit<CustomText, "text">,
              );
            }
          }}
        />
      </div>
    </Slate>
  );
};

export default RichTextbox;
