import "./NoticeBoard.css";
import { useState } from "react";
import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#ffecb3",
  },
  tab: {
    color: "#071a42",
  },
  alltext: {
    textAlign: "center",
    background: "#FBFBEF",
  },
  formwrapper: {
    width: "38%",
    margin: "0 auto",
    marginTop: "50px",
  },
  breadcontainer: {
    margin: "0 auto",
    width: "38%",
    // border: "3px solid #333",
    //padding: "10px 0 10px 0",
    marginBottom: "5px",
  },
  contenttext: {
    textAlign: "left",
  },
}));

const NoticeBoard = () => {
  const [breadContect, setBreadContent] = useState({
    title: "",
    content: "",
  });

  const [viewContent, setViewContent] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setBreadContent({
      ...breadContect,
      [name]: value,
    });
    console.log(breadContect);
  };
  const classes = useStyles();

  const options = ["수정", "삭제"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.alltext}>
      <div className={classes.formwrapper}>
        <AppBar position="fixed" className={classes.appbar}>
          <Tabs centered className={classes.title2}>
            <Tab label="Home" className={classes.tab} />
            <Tab label="Search" className={classes.tab} />
            <Tab label="Comunity" className={classes.tab} />
            <Tab label="1:1 Q&A" className={classes.tab} />
            <Tab label="Contact Us" className={classes.tab} />
          </Tabs>
        </AppBar>

        <TextField
          type="text"
          label="제목"
          onChange={getValue}
          name="title"
          size="small"
          variant="outlined"
          style={{
            marginBottom: "15px",
            marginRight: "449px",
            marginTop: "20px",
          }}
        />
        <Button
          style={{ width: "5%", marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={() => {
            setViewContent(viewContent.concat({ ...breadContect }));
          }}
        >
          입력
        </Button>
        <CKEditor
          editor={ClassicEditor}
          data
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setBreadContent({
              ...breadContect,
              content: data,
            });
            console.log(breadContect);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>

      <h1>Bread Board</h1>
      <div className={classes.breadcontainer}>
        {viewContent.map((element) => (
          <Paper
            elevation={3}
            style={{
              border: "1px solid #333",
              marginTop: "13px",
            }}
          >
            <h2>
              {element.title}{" "}
              <IconButton style={{ float: "right" }} onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>{" "}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {options.map((option) => (
                  <MenuItem key={option}>{option}</MenuItem>
                ))}
              </Menu>
            </h2>

            <div className={classes.contenttext}>
              {ReactHtmlParser(element.content)}
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};
export default NoticeBoard;
